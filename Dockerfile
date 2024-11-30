# Use the official Deno image as the base image
FROM denoland/deno:debian

EXPOSE 8000

# Set the working directory inside the container
WORKDIR /photo-gallery

# Copy your application code (if needed) into the container
# For this command specifically, we don't need to copy any code,
# but if you plan to develop with Vite, you might want to include project files.
COPY . /photo-gallery

RUN deno install

RUN deno task build
# Command to run the desired command
# CMD ["deno", "run", "-A", "--node-modules-dir=auto", "npm:vite"]
CMD ["deno", "task", "server:start"]
