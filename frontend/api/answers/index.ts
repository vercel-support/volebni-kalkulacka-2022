import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Prisma } from '@prisma/client';
import { prisma, getBody } from '../../src/server/prisma.ts';
import { authUser } from '../../src/server/auth.ts';
import {
  respond405,
  prismaErrorHandler,
  respond401,
} from '../../src/server/errors.ts';

export default async function (req: VercelRequest, res: VercelResponse) {
  const auth = await authUser(req, res);
  if (req.method === 'GET') {
    if (!auth?.user) {
      return respond401(res);
    }
    const answers = await prisma.answers.findMany({
      where: { userId: auth.user.id },
    });
    return res.json(answers);
  } else if (req.method === 'POST') {
    const body = getBody(req, res);
    const answers = body.answers as Prisma.JsonObject;
    const matches = body.matches as Prisma.JsonObject;
    const result = await prisma.answers
      .create({
        data: {
          answers: answers,
          matches: matches,
          source: req.body.source,
          embedName: req.body.embedName,
          calculatorId: req.body.calculatorId,
          userId: auth?.user?.id,
        },
      })
      .catch(prismaErrorHandler(res));
    return res.json(result);
  } else {
    respond405(res, req.method);
  }
}
