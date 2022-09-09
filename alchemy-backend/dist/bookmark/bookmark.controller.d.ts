import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
export declare class BookmarkController {
    private bookmarkService;
    constructor(bookmarkService: BookmarkService);
    getBookmarks(userId: number): any;
    getBookmarkById(userId: number, bookmarkId: number): any;
    createBookmark(userId: number, dto: CreateBookmarkDto): Promise<any>;
    editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto): Promise<any>;
    deleteBookmarkById(userId: number, bookmarkId: number): Promise<void>;
}
