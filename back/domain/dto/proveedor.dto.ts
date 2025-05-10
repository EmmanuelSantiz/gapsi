export interface ProveedorDTO {
    id?: number;
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

/*"nombre": "Insumos Médicos S.A.",
  "contacto": "Laura Gómez",
  "email": "laura@insumosmedicos.com",
  "telefono": "+52 55 1234 5678",
  "direccion": "Av. Reforma 123, CDMX, México",
  "categoria": "Insumos médicos",
  "rfc": "IME123456XYZ",
  "fechaRegistro": "2025-05-08",
  "estatus": "activo",
  "notas": "Proveedor preferente para hospitales públicos."*/