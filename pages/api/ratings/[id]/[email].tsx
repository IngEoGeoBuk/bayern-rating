import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../../utils/dbConnect";
import { Rating } from '../../../../models/Rating';
import { ModelRatingType } from '../../../../types'

interface dataTypes {
    data?: ModelRatingType[]
    success: boolean,
}

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse<dataTypes>) => {
    const {
        query: { email },
        method
    } = req;

    switch (method) {
        // 로그인한 아이디로부터 별점 가져오기
        case 'POST':
            const poId = req.body.poId;
            const email = req.body.email;
            try {
                const ratings = await Rating.find({ "poId" : poId, "email": email });
                if (!ratings) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: ratings })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}