import * as fs from 'fs';
import * as path from 'path';
import { Suppliers } from '../domain/models/supplier.model';

export class DataBase {
    private filePath: string;
  
    constructor(fileName = '../bd.json') {
        this.filePath = path.resolve(__dirname, fileName);
        this.ensureFileExists();
    }
  
    private ensureFileExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), 'utf8');
        }
    }
  
    guardarProveedor(proveedor: Suppliers): void {
        const proveedores = this.obtenerTodos();
        const index = proveedores.findIndex(p => p.id === proveedor.id);

        console.log(proveedor);
        if (index !== -1) {
          proveedores[index] = proveedor;
        } else {
          proveedores.push(proveedor);
        }

        console.log(proveedores);
    
        fs.writeFileSync(this.filePath, JSON.stringify(proveedores, null, 2));
    }
  
    // Obtener todos los registros
    public obtenerTodos(): Suppliers[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    // Obtener el ultimo Id suponiendo que todos tienen el campo ID
    public obtenerUltimoId(): number {
        const proveedores = this.obtenerTodos();
        return proveedores.length > 0 ? Math.max(...proveedores.map(p => p.id!)) : 0;
    }

    //Obtiene registo por nombre
    obtenerPorNombre(name: string): Suppliers[] {
        const proveedores = this.obtenerTodos();
        console.log('busqueda');
        console.log(name);
        return proveedores.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }

    eliminarPorId(id: number): boolean {
        const proveedores = this.obtenerTodos();
        const updated = proveedores.filter(p => p.id !== id);
        if (updated.length === proveedores.length) return false;
    
        fs.writeFileSync(this.filePath, JSON.stringify(updated, null, 2));
        return true;
    }
}