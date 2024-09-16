import { connectDB } from '@/connectdb/connectDB'
import User from '@/models/User';
import bcrypt from 'bcrypt'

export default async function POST(req, res) {

    try {

        const { username, password } = req.body

        await connectDB();

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Return user object to NextAuth
        res.status(200).json({ id: user._id, name: user.username })

    } catch (error) {


    }

}
