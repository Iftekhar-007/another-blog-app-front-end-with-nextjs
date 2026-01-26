export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured: boolean;
  status: string;
  tags?: string[];
  views: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    comments: number;
  };
}

//  {
//             "id": "0cdfdc36-1183-4b85-b250-ca09fa5ea30a",
//             "title": "I am going to kill you",
//             "content": "Here I will teach you how to kill a mosquito,rat,cockroach(It's actual cockroch not your studpi dumb bf/gf)",
//             "thumbnail": null,
//             "isFeatued": false,
//             "status": "Published",
//             "tags": [
//                 "hello",
//                 "next level",
//                 "ph",
//                 "hello"
//             ],
//             "views": 0,
//             "authorId": "uGUfvgBrJ5csuiEg17mqMUhYAB4RkmbQ",
//             "createdAt": "2026-01-25T12:58:42.501Z",
//             "updatedAt": "2026-01-25T12:58:42.501Z",
//             "_count": {
//                 "comments": 0
//             }
//         }
