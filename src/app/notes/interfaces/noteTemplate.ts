export interface noteInstance{
    type: string;
    value: string;
    content: noteInstance[];

    
    subHeadingType?: 1 | 2 | 3;
    open?: boolean;
    width?: number;

    confidenceLevel?: (0 | 1 | 2 | 3)[],
    dateOfLastReview?: number,
    
    lastOutput?: string;
}