export interface Cell {
    status: 'pending' | 'active' | 'failed' | 'success';
    played: boolean;
}