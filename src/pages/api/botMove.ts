import { NextApiRequest, NextApiResponse } from 'next';
import { getBotMove } from '@/lib/gameLogic';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { board, player, difficulty } = req.body;
      if (!board || !player || !difficulty) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const move = await getBotMove({ board, player, difficulty });
      res.status(200).json({ move });
    } catch (error) {
      console.error('Error fetching bot move:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};