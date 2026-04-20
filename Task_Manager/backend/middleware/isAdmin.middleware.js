const isAdmin = async(req,res,next)=>{
  try {
    console.log("user role:", req.user.role);
    if(req.user.role === "admin")
      return next()
    return res.status(403).json({"message":"not an admin"})
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
export default isAdmin