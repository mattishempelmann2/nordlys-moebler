import { Scroll } from "@react-three/drei";

const sectionStyle: React.CSSProperties = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center', 
  padding: '0 10%',    
  boxSizing: 'border-box'
};

const h1Style: React.CSSProperties = {
  fontSize: '5rem',
  fontWeight: '800',
  letterSpacing: '-0.05em', 
  margin: 0,
  color: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif'
};

const pStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  color: '#86868b', 
  marginTop: '1rem',
  fontWeight: 500,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif'
};

export const Overlay = () => {
  return (
    <Scroll html style={{ width: '100%' }}>
      
      <section style={{ ...sectionStyle, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={h1Style}>Nordlys Møbler.</h1>
          <p style={pStyle}>SCANDINAVIAN TEST SIMPLICITY.</p>
        </div>
      </section>

      <section style={{ ...sectionStyle, justifyContent: 'flex-start' }}>
        <div style={{ maxWidth: '500px' }}>
          <h1 style={{ ...h1Style, fontSize: '4rem' }}>Crafted by<br/>Nature.</h1>
          <p style={pStyle}>Sustainably sourced Norwegian oak. Finished with natural oils.</p>
        </div>
      </section>

      <section style={{ ...sectionStyle, justifyContent: 'flex-end' }}>
        <div style={{ maxWidth: '500px', textAlign: 'right' }}>
          <h1 style={{ ...h1Style, fontSize: '4rem' }}>Timeless<br/>Form.</h1>
          <p style={pStyle}>Inspired by the dancing lights of the north.</p>
        </div>
      </section>

      <section style={{ ...sectionStyle, justifyContent: 'center' }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          backdropFilter: 'blur(20px)', 
          padding: '3rem 4rem', 
          borderRadius: '30px', 
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', margin: '0 0 10px 0' }}>The Aurora Lounge</h2>
            <p style={{ fontSize: '1.2rem', color: '#86868b', marginBottom: '30px' }}>From 149,999 NOK</p>
            
            {/* SNIPCART BUTTON (Styled) */}
            <button 
                className="snipcart-add-item"
                data-item-id="aurora-lounge"
                data-item-price="14999"
                data-item-url="/" 
                data-item-description="Norwegian Oak Lounge Chair"
                data-item-image="https://via.placeholder.com/150"
                data-item-name="Aurora Lounge"
                style={{ 
                  background: '#2997ff', 
                  color: 'white', 
                  border: 'none', 
                  padding: '16px 40px', 
                  borderRadius: '99px', 
                  fontSize: '1.2rem', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  transition: 'transform 0.2s, background 0.2s, box-shadow 0.2s',
                  boxShadow: '0 10px 30px rgba(41, 151, 255, 0.4)' // Blue glow
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.background = "#0071e3"; // Darker blue on hover
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = "#2997ff"; // Reset blue
                }}
            >
                Order Now
            </button>
        </div>
      </section>

    </Scroll>
  );
};