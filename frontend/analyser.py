import os
import sys
import argparse

def analyze_directory_contents(directory_path):
    """
    Analyzes the contents of a given directory, saving the content of non-image
    files and a list of image files to a text file.

    Args:
        directory_path (str): The path to the directory to analyze.
    """
    if not os.path.isdir(directory_path):
        print(f"Error: Directory not found at '{directory_path}'")
        return

    # Determine the output filename from the directory path
    # os.path.abspath ensures there's no trailing slash
    # os.path.basename gets the last component of the path
    dir_name = os.path.basename(os.path.abspath(directory_path))
    output_filename = f"{dir_name}.txt"

    original_stdout = sys.stdout  # Save a reference to the original standard output

    try:
        with open(output_filename, 'w', encoding='utf-8') as f:
            sys.stdout = f  # Redirect stdout to the file

            print(f"Analysis of directory: '{directory_path}'\n")

            image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.tiff'}
            non_image_files = []
            image_files = []

            for entry in os.scandir(directory_path):
                if entry.is_file():
                    _, extension = os.path.splitext(entry.name)
                    if extension.lower() in image_extensions:
                        image_files.append(entry.name)
                    else:
                        non_image_files.append(entry.path)

            # Print contents of non-image files
            for filepath in non_image_files:
                filename = os.path.basename(filepath)
                print(f"- file {filename}:\n")
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as content_file:
                        print(content_file.read())
                except Exception as e:
                    print(f"(Could not read file: {e})\n")
                print("-" * 20)

            # List the image files found
            if image_files:
                print("\nThere are also image files:")
                for filename in image_files:
                    print(f"- {filename}")

    except OSError as e:
        # If an error occurs, print it to the original console
        sys.stdout = original_stdout
        print(f"Error writing to file or scanning directory: {e}")
    finally:
        sys.stdout = original_stdout  # Restore stdout to its original state

    print(f"Output successfully saved to '{output_filename}'")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Scan a directory and save its contents' analysis to a text file."
    )
    parser.add_argument(
        "directory",
        nargs='?',
        default='.',
        help="The directory to scan. Defaults to the current directory."
    )
    args = parser.parse_args()

    analyze_directory_contents(args.directory)