export enum Producto {
  CAJA_BUEN_SABOR = "CAJA_BUEN_SABOR",
  CAJA_BUEN_DECANA = "CAJA_BUEN_DECANA",
}

export const PRODUCT_LABEL: Record<Producto, string> = {
  [Producto.CAJA_BUEN_SABOR]: 'Caja de panela Buen Sabor',
  [Producto.CAJA_BUEN_DECANA]: 'Caja de panela Buen de Caña',
};
