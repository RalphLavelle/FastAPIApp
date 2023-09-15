from fastapi.responses import FileResponse

def getFile(book_id: str, part_id: int, chapter_id: int):
    chapter_path = f'books/{book_id}/p{part_id}c{chapter_id}.html'
    try:
        with open(chapter_path, "r") as file:
            file_text = file.read()
        
            # Return the file text as a JSON response
            return file_text
    except Exception as e:
        return f'Part {part_id}, chapter {chapter_id} not found.'