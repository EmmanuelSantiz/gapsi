import { Constantes } from "../utils/constantes";

class HomeService {
    async welcome() {
        return {
            result: true,
            data: {
                img: './assets/logo.png',
                message: 'Bienvenido Candidato 01',
                verson: Constantes.APP_VERSION
            }
        };
    }

}

export default new HomeService();