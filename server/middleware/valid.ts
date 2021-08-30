import {Request, Response, NextFunction} from 'express'

export const validRegister = async (req: Request, res: Response, next: NextFunction) =>{
  const {name, account, password} = req.body

  if(!name) {
    return res.status(400).json({msg:'Please add your name'})
  } else if(name.length > 20){
    return res.status(400).json({msg:'Name is upto 20 chars long'})
  }

  if(!account){
    return res.status(400).json({msg:'Please add your email'})

  } else if( !validPhone(account) && !validateEmail(account)){
    return res.status(400).json({msg:'Must be a valid email ID or Phone Number'})
  }

  if(password.length < 6){
    return res.status(400).json({msg:'password must be at last 6 chars'})
  }

  next()
}

export function validPhone(phone: string) {
  const re = /^[+]/g
  return re.test(phone)
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}