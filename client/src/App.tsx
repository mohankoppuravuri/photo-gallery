import { useEffect, useRef, useState } from "react";
import "./App.css";
import type { PhotoJSONType, SavedStateType } from "./types.ts";
import type React from "@types/react";
import { type SetStateAction } from "@types/react";
import { imageURLs } from "./constants.ts";

const RenderImage: React.FC<{
  item: PhotoJSONType;
  handleClick: () => void;
}> = ({ item, handleClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <p>{item.type}</p>
      <img
        style={isLoading
          ? {
            display: "none",
          }
          : {}}
        src={item.src}
        alt={item.title}
        onClick={handleClick}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
      {isLoading ? <div className="loader"></div> : null}
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [overlayImageURL, setOverlayImageURL] = useState("");
  /** For some reason useState is not considering the type provided using useState<PhotoJSONType[]> */
  const [items, setItems]: [
    PhotoJSONType[],
    React.Dispatch<SetStateAction<PhotoJSONType[]>>,
  ] = useState([]);
  const ref = useRef();
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [saveState, setSaveState]: [SavedStateType, React.Dispatch<SetStateAction<SavedStateType[]>>] = useState()

  /**
   *  Saving every 5 seconds
  */

  const saveOrder = async () => {
    /** Save the order in the local storage */
    if (!ref.current?.length || localStorage.getItem("photoes") === JSON.stringify(ref.current)) {
      return;
    }
    setSaveState(prev => ({
      ...prev,
      isLoading: true
    }));

    await fetch("photoes", { method: "POST" })
    localStorage.setItem("photoes", JSON.stringify(ref.current));
    setSaveState({
      lastSavedTimeStamp: new Date().toISOString(),
      isLoading: false,
    })
  };

  useEffect(() => {
    ref.current = items;
  }, [items]);

  useEffect(() => {
    /**
     * Fetching image data
     */
    fetchPhotoJSONList();

    /**
     * Esc button control
     */
    const handleEscEventListener = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setOverlayImageURL("");
      }
    }
    document.addEventListener("keydown", handleEscEventListener);


    const interval = setInterval(
      saveOrder,
      5000,
    );

    return () => {
      clearInterval(interval);
      document.removeEventListener("keydown", handleEscEventListener);
    };
  }, []);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> | undefined = (
    event,
  ) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      // Reorder items
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);

      setItems(newItems);
    }
    setDraggedIndex(null);
  };

  const fetchPhotoJSONList = async () => {
    /**
     * 1. Check if data exists in localstorage.
     * 2. If yes then save it at local state.
     * 3. If not then make an API call to fetch the data.
     * 4. Cache the data at local storage.
     */

    const localStoragePhotoesString = localStorage.getItem("photoes");
    if (localStoragePhotoesString) {
      const localStoragePhotoes = JSON.parse(localStoragePhotoesString);
      setItems(localStoragePhotoes);
    } else {
      const response = await fetch("/photoes");
      const data: PhotoJSONType[] = await response.json();
      const formattedData = data.map((item, idx) => ({
        ...item,
        src: imageURLs[idx],
      }));
      setItems(formattedData);
      localStorage.setItem("photoes", JSON.stringify(formattedData));
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      {overlayImageURL
        ? (
          <div className="overlay">
            <img src={overlayImageURL} />
          </div>
        )
        : null}

      <div className="last-saved-container">
        {saveState?.isLoading ? <div className="sync-loader"> </div> :
          saveState ? <div>
            Last saved at: {new Date(saveState.lastSavedTimeStamp).toLocaleString("en")}
          </div> : null}
      </div >

      <div className="container">
        {items.map((item, index) => (
          <div
            className={`grid-item-${index + 1}`}
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <RenderImage
              item={item}
              handleClick={() => {
                setOverlayImageURL(item.src);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
