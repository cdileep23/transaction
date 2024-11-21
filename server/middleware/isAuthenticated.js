import jwt from 'jsonwebtoken'

export const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
      
        if (!token) {
            return res.status(401).json({ message: "User not Authenticated", success: false });
          }
      
        
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
          if (!decoded) {
            return res.status(401).json({ message: "Invalid Token", success: false });
          }

          req.userId=decoded.userId
          next()
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message, success:false})
    }
}