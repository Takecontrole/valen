import react from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"
const Container = styled.div`
  background-color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 30px;
  
  `;
const Brand = styled.div`
font-size: 35px;
padding-top: 10px;
padding-bottom: 30px;
`; 
const Brands = () => {
  return (
    <Container className="Brands">
    
    <Brand> 
     <h5>Наши бренды</h5>
    </Brand>
   
        
        
               
          <Link to="/products/brands/Contra la contra"  style={{color:"black",textDecoration: 'none' }}>
              <Brand> 
     <h1>Contra la Contra</h1>
    </Brand>
 </Link>
        
      
        
          <Link style={{color:"black",textDecoration: 'none' }} to="/products/brands/Beastie girls" >
          <Brand> 
     <p className="Beastie">Beastie Girls</p>
      </Brand>
          </Link>
      
        
            
              <Link to="/products/brands/Bad brains"  style={{color:"black",textDecoration: 'none' }}>
            <Brand> 
     <p className="brains">Bad Brains</p>
      </Brand>
          </Link>
     
       
          <Link to="/products/brands/Acrostix"  style={{color:"black",textDecoration: 'none' }}>
                <Brand> 
     <p >AcrostiX</p>
      </Brand>
          </Link>
        
        
        
        <Link to="/products/brands/CROSS"  style={{color:"black",textDecoration: 'none' }}>
             <Brand> 
     <p className="cross">CROSS</p>
      </Brand>
</Link>
       
   
     
        </Container>
    
  )
}

export default Brands;