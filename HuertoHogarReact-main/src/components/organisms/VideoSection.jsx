export default function VideoSection(){
  return (
    <section className="video-section">
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/1q8o6gRs-IA"
          title="HuertoHogar video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  )
}
