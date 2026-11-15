function OfertaRelampago({ segundos }) {
    if (segundos === 0) {
        return (
            <section className="oferta oferta-terminada">
                La oferta del Propulsor turbo terminó.
            </section>
        );
    }

    return (
        <section className="oferta">
            <span>Oferta relámpago: Propulsor turbo a 450 cr</span>
            <span className="cuenta">Termina en {segundos} s</span>
        </section>
    );
}

export default OfertaRelampago;