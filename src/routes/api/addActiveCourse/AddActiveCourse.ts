import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';

interface Request {
  json: () => Promise<any>;
}

type RequestHandler = (args: { request: Request }) => Promise<any>;

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }: { request: Request }) => {
  try {
    const { userId, courseId } = await request.json();

    if (!userId || !courseId) {
        throw error(400, 'Missing userId or courseId');
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        activeCourses: {
          connect: { id: courseId }
        }
      },
      include: {
        activeCourses: true
      }
    });

    return json({ success: true, user: updatedUser });
  } catch (err) {
        console.error('Error adding active course:', err);
        throw error(500, 'Failed to add active course');
    }
};
