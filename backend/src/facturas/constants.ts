//aca guardamos los valores por defecto 
//con esto calcularemos y validaremos
export enum TipoFactura {
  FV1 = "FV-1 ",
  FV2 = "FV-2",
}

export const TIPO_FACTURA_LABEL: Record<TipoFactura, string> = {
  [TipoFactura.FV1]: 'FV-1 · Factura de venta No',
  [TipoFactura.FV2]: 'FV-2 · Factura electrónica',
};


export enum Producto {
  CAJA_BUEN_SABOR = "CAJA_BUEN_SABOR",
  CAJA_BUEN_DECANA = "CAJA_BUEN_DECANA",
}

export const PRODUCT_PRICE: Record<Producto, number> = {
  [Producto.CAJA_BUEN_SABOR]: 128,
  [Producto.CAJA_BUEN_DECANA]: 135,
};

// Etiquetas legibles para productos
export const PRODUCT_LABEL: Record<Producto, string> = {
  [Producto.CAJA_BUEN_SABOR]: 'Caja de panela Buen Sabor',
  [Producto.CAJA_BUEN_DECANA]: 'Caja de panela Buen de Caña',
};



export enum FormaPago {
  EFECTIVO = "EFECTIVO",
  TRANSFERENCIA = "TRANSFERENCIA",
}

export const FORMA_PAGO_LABEL: Record<FormaPago, string> = {
  [FormaPago.EFECTIVO]: 'Efectivo',
  [FormaPago.TRANSFERENCIA]: 'Transferencia',
};

export const FORMA_PAGO_OPTIONS = [
  { value: FormaPago.EFECTIVO, label: FORMA_PAGO_LABEL[FormaPago.EFECTIVO] },
  { value: FormaPago.TRANSFERENCIA, label: FORMA_PAGO_LABEL[FormaPago.TRANSFERENCIA] },
];