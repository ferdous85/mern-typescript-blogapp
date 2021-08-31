import {Request, Response} from 'express'
import Users from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateActiveToken } from '../config/generateToken'
import sendEmail from '../config/sendEmail'
import {IToken} from '../config/interface'
import { validateEmail } from '../middleware/valid'

const CLIENT_URL = `${process.env.BASE_URL}`

const authCtrl={
  register: async(req: Request, res: Response) =>{
    try {
      const {name, account, password} = req.body
      const user = await Users.findOne({account})
      if(user) return res.status(400).json({msg: "Email already exist"})

      const passwordHash = await bcrypt.hash(password, 12)
      const newUser ={name, account, password: passwordHash}

      const active_token = generateActiveToken(newUser)

      const url = `${CLIENT_URL}/active/${active_token}`
      // const new_user = new Users(newUser)

      // await new_user.save()

      if(validateEmail(account)){
        sendEmail(account, url, 'Verify your email ID')
        return res.json({msg:'Success! Please check your email'})
      } 

    } catch (error) {
      return res.status(500).json({msg: error})
    }
  },

  activeAccount: async(req: Request, res: Response) =>{
    try {
      const { active_token } = req.body
      const decoded =<IToken> jwt.verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
      
      const { newUser} = decoded 

      const user = new Users(newUser)
      console.log(user);
      
      await user.save()
      res.json({msg: "Account has been activated"})
    } catch (error) {
      return res.status(500).json({msg: error})
    }
  }

}


export default authCtrl