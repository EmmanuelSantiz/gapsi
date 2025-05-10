export interface Proveedor {
    id: number | null;
    nombre: string;
    razonSocial: string | null;
    contacto: string;
    correo: string | null;
    telefono: string;
    direccion: string | null;
    categoria: string | null;
    rfc: string;
    estado: boolean | number;
    notas?: string;
    fechaRegistro?: Date;
}