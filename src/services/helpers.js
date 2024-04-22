export const helpers = {
  formatCurrency: (value) => {
    return parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  },

  formatDate: (date) => { // ISO 8601 format to dd/mm/yyyy
    return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
  },

  statusDictionary: {
    DRAFT: 'Borrador',
    PENDING: 'Pendiente',
    IN_PROGRESS: 'Procesando',
    FINISHED: 'Finalizado',
    CANCELED: 'Cancelado',
    BILLED: 'Facturado'
  },

  inverseStatusDictionary: {
    Borrador: 'DRAFT',
    Pendiente: 'PENDING',
    Procesando: 'IN_PROGRESS',
    Finalizado: 'FINISHED',
    Cancelado: 'CANCELED',
    Facturado: 'BILLED'
  }

}

