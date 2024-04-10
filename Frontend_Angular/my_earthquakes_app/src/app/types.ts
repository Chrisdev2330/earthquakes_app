export interface Comment {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Feature {
    id: number;
    type: string;
    attributes: {
      external_id: string;
      magnitude: number;
      place: string;
      time: string;
      tsunami: boolean;
      mag_type: string;
      title: string;
      coordinates: {
        longitude: number;
        latitude: number;
      };
    };
    links: {
      external_url: string;
    };
    comments: Comment[];
    newComment?: string; 
  }
  