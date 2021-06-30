import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../../utils/dbConnect";
import { Rating } from '../../../../models/Rating';
import { ModelRatingType } from '../../../../types'

interface dataTypes {
    data?: ModelRatingType[] | ModelRatingType
    success: boolean,
}

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse<dataTypes>) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        // 별점 아이디에 해당하는 것들 다 불러오기(Details)
        case 'GET':
            try {
                const ratings = await Rating.find({ "poId" : {$in: [ (`${id}`)]} })!;
                // const ratings = await Rating.find();
                if (!ratings) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: ratings })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // 별점 만들기
        case 'POST':
            try {
                const rating = await Rating.create(req.body);
                res.status(201).json({ success: true, data: rating })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // 별점 수정
        case 'PUT':
            try {
                const updateRating = await Rating.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!updateRating) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: updateRating })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // 별점 삭제
        case 'DELETE':
            try {
                const deletedBoard = await Rating.deleteOne({ _id: id })
                if (!deletedBoard) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}