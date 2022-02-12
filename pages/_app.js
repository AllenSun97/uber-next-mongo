import "mapbox-gl/dist/mapbox-gl.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          height: 100vh;
          overflow: hidden;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
