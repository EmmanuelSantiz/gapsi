import { ProveedorDTO } from "../dto/proveedor.dto";

// Modelo para proveedores escrito en Ingles
// Nota: Esta escrito en ingles para auditorias y mapeo de datos en modelos
export class Suppliers {
    id?: number;
    name: string;
    companyName: string | null;
    contact: string;
    email: string | null;
    phone: string;
    address: string | null; 
    category: string | null;
    rfc: string;
    status: boolean | number;
    notes?: string | null;
    createdAt: Date;

    // Constructor que resive DTO para parceo de informacion de entrada
    constructor(dto: ProveedorDTO) {
        this.name        = dto.nombre;
        this.companyName = dto.razonSocial;
        this.contact     = dto.contacto;
        this.email       = dto.correo;
        this.phone       = dto.telefono;
        this.address     = dto.direccion;
        this.category    = dto.categoria;
        this.rfc         = dto.rfc;
        this.status      = dto.estado;
        this.notes       = dto.notas;
        this.createdAt   = new Date();
    }

    // Funcion para obenter solo los datos que seran insertados
    get toParameters(): any[] {
        return [
            this.id,
            this.name,
            this.companyName,
            this.contact,
            this.email,
            this.phone,
            this.address,
            this.category,
            this.rfc,
            this.status,
            this.notes,
            this.createdAt
        ];
    }
}