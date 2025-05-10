import { Constantes } from "../utils/constantes";

class HomeService {
    async welcome() {
        return {
            result: false,
            data: {
                img: 'ruta/de/la/img',
                message: 'Bienvenido Candidato 01',
                verson: Constantes.APP_VERSION
            }
        };
    }

}

export default new HomeService();