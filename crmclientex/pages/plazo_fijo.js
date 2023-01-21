//Utilizando en test.js la página principal Layout.js (notar que existe un
//parámetro children, que es donde debe ir la propiedad Layout importada.
import Layout from "../componentes/Layout";

const PlazoFijo = ()=> (
    <div>
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Plazos fijos</h1>
        </Layout>
    </div>
)
export default PlazoFijo;