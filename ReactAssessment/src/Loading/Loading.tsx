import "./Loading.css";

function Loading() {
  return (
    <section className="loading" role="status" aria-label="Loading">
      <div className="lds-ring" role="alert" aria-busy="true">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

export default Loading;
