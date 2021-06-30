import dbConnect from "../../../utils/dbConnect";
import { Rating } from '../../../models/Rating';
import type { NextApiRequest, NextApiResponse } from 'next'
import { GradeType } from '../../../types'
 
interface dataTypes {
    data?: GradeType[],
    success: boolean,
}

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse<dataTypes> ) => {
    const { method } = req;

    switch(method) {
        // 전체 별점 리스트 불러오기
        case 'GET':
            try {
                const grades = await Rating.aggregate([{
                    $group : {
                        _id: "$poId",
                        total: { $sum: "$rating" },
                        count: { $sum: 1 }
                    },
                }, 
                { $sort : { 'no' : 1 } }
            ])
                res.status(200).json({ success: true, data: grades })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default: 
            res.status(400).json({ success: false });
            break;
    }
}
