const AuthLayout = ({ 
    children
  }: { 
    children: React.ReactNode
  }) => {
    return ( 
      <div className="h-[80vh] flex items-center justify-center">
        {children}
      </div>
     );
  }
   
  export default AuthLayout;