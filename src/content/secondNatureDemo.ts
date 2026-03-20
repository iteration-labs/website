export const secondNatureMetrics = [
  { label: 'Active SKUs', value: '24', detail: '+3 pending launch', tone: 'olive' },
  { label: 'Units in stock', value: '8,460', detail: 'Across 2 warehouses', tone: 'blue' },
  { label: 'Orders this week', value: '312', detail: '+18% vs last week', tone: 'rust' },
  { label: 'On-time delivery', value: '96.4%', detail: 'Last 30 days', tone: 'olive' },
  { label: 'Inbound shipments', value: '4', detail: '2 require action', tone: 'rust' },
  { label: 'Revenue this month', value: 'S$84.2k', detail: 'DTC + retail', tone: 'blue' },
  { label: 'Repeat customer rate', value: '38%', detail: 'Healthy re-order trend', tone: 'olive' },
  { label: 'Low stock alerts', value: '5', detail: '2 urgent this week', tone: 'rust' },
] as const;

export const secondNaturePillars = [
  {
    title: 'Source from India',
    description: 'Coordinate suppliers, MOQs, procurement windows, and batch readiness from a single operating view.',
  },
  {
    title: 'Track every shipment',
    description: 'Know what is in production, at port, clearing customs, or landing into inventory before stock gaps happen.',
  },
  {
    title: 'Manage inventory and orders',
    description: 'See landed inventory, channel allocation, and low stock pressure without enterprise overhead.',
  },
  {
    title: 'Deliver with confidence',
    description: 'Monitor fulfilment throughput, last-mile performance, and customer outcomes in one founder dashboard.',
  },
] as const;

export const secondNatureJourney = [
  'Supplier onboarding',
  'Production / procurement',
  'Shipment in transit',
  'Customs / arrival',
  'Warehouse / inventory',
  'Orders',
  'Last-mile delivery',
  'Customer feedback / retention',
] as const;

export const secondNatureShipments = [
  {
    batch: 'SN-024',
    product: 'Turmeric Trail Mix',
    status: 'In Production',
    eta: 'Ready Mar 24',
    origin: 'Coimbatore, India',
    destination: 'Singapore DC',
    progress: 28,
    note: 'Packaging artwork approved 2h ago',
  },
  {
    batch: 'SN-025',
    product: 'Curry Leaf Crackers',
    status: 'At Port',
    eta: 'Arrives Mar 27',
    origin: 'Chennai Port',
    destination: 'Singapore DC',
    progress: 56,
    note: 'Loaded into container CN-88',
  },
  {
    batch: 'SN-026',
    product: 'Jaggery Granola',
    status: 'Customs Clearance',
    eta: 'Released Mar 22',
    origin: 'Mumbai Port',
    destination: 'Singapore DC',
    progress: 81,
    note: 'Awaiting final customs release',
  },
  {
    batch: 'SN-027',
    product: 'Millet Bites',
    status: 'Delivered to Warehouse',
    eta: 'Received Mar 19',
    origin: 'Bengaluru, India',
    destination: 'Jurong Fulfilment Hub',
    progress: 100,
    note: 'QA completed, 1,260 units available',
  },
] as const;

export const secondNatureOrdersByChannel = [
  { channel: 'DTC', orders: 146, color: 'bg-ink' },
  { channel: 'Retail partners', orders: 92, color: 'bg-olive' },
  { channel: 'Marketplaces', orders: 51, color: 'bg-blue' },
  { channel: 'Corporate gifting', orders: 23, color: 'bg-rust' },
] as const;

export const secondNatureTopProducts = [
  { name: 'Curry Leaf Crackers', share: 34, revenue: 'S$18.4k' },
  { name: 'Turmeric Trail Mix', share: 26, revenue: 'S$14.1k' },
  { name: 'Millet Bites', share: 19, revenue: 'S$10.8k' },
  { name: 'Jaggery Granola', share: 14, revenue: 'S$8.2k' },
] as const;

export const secondNatureDeliveryMix = [
  { label: 'Delivered on time', value: 68, tone: 'bg-olive' },
  { label: 'Out for delivery', value: 17, tone: 'bg-blue' },
  { label: 'At warehouse', value: 9, tone: 'bg-amber-300' },
  { label: 'Delayed', value: 6, tone: 'bg-rust' },
] as const;

export const secondNatureAlerts = [
  {
    title: 'Reorder trigger',
    detail: 'Masala Seed Mix is projected to hit safety stock in 6 days.',
    timestamp: 'Updated 12 min ago',
  },
  {
    title: 'Customs follow-up',
    detail: 'SN-026 requires broker confirmation before 4:30 PM SGT.',
    timestamp: 'Updated 34 min ago',
  },
  {
    title: 'Retail launch prep',
    detail: 'NTUC channel needs pack shots and barcode sheet by Monday.',
    timestamp: 'Updated 1h ago',
  },
] as const;

export const secondNatureCatalog = [
  {
    name: 'Curry Leaf Crackers',
    sku: 'SN-CLK-014',
    batch: 'SN-025',
    stock: '1,840 units',
    status: 'Inbound',
    channels: ['DTC', 'Retail'],
  },
  {
    name: 'Millet Bites',
    sku: 'SN-MLT-011',
    batch: 'SN-027',
    stock: '1,260 units',
    status: 'Ready',
    channels: ['DTC', 'Marketplace'],
  },
  {
    name: 'Jaggery Granola',
    sku: 'SN-JGR-009',
    batch: 'SN-026',
    stock: '620 units',
    status: 'Clearing customs',
    channels: ['DTC', 'Retail'],
  },
  {
    name: 'Turmeric Trail Mix',
    sku: 'SN-TRM-018',
    batch: 'SN-024',
    stock: '420 units',
    status: 'Production',
    channels: ['DTC'],
  },
  {
    name: 'Masala Seed Mix',
    sku: 'SN-MSM-006',
    batch: 'SN-022',
    stock: '188 units',
    status: 'Low stock',
    channels: ['DTC', 'Corporate'],
  },
  {
    name: 'Coconut Spice Clusters',
    sku: 'SN-CSC-012',
    batch: 'SN-023',
    stock: '940 units',
    status: 'Healthy',
    channels: ['Retail', 'Marketplace'],
  },
] as const;

export const secondNatureTimeline = [
  { label: 'Production booked', date: 'Mar 12', state: 'done' },
  { label: 'Container departed Chennai', date: 'Mar 18', state: 'done' },
  { label: 'Customs pre-clearance', date: 'Mar 21', state: 'active' },
  { label: 'Warehouse putaway', date: 'Mar 22', state: 'upcoming' },
  { label: 'Channel allocation', date: 'Mar 23', state: 'upcoming' },
] as const;

export const secondNatureProofPoints = [
  {
    title: 'Real product business context',
    description: 'Roots Matter demonstrates how the model translates into a live brand environment where product movement, fulfilment, and commercial control stay connected.',
  },
  {
    title: 'Operational visibility',
    description: 'The same operating principles already support sourcing, batches, fulfilment, and customer delivery through one accountable view.',
  },
  {
    title: 'Digital + physical ecosystem',
    description: 'Software, operator workflows, and physical execution work together as one integrated offering rather than disconnected tools and vendors.',
  },
] as const;

export const secondNatureIntegratedModel = [
  {
    title: 'Software layer',
    description: 'Founders get one operating view across vendors, inbound movement, inventory, orders, and delivery performance.',
  },
  {
    title: 'Operator network',
    description: 'Iteration Labs coordinates sourcing, shipment flow, exceptions, and fulfilment oversight through an established execution layer.',
  },
  {
    title: 'Supply chain visibility',
    description: 'Every batch, ETA, stock position, and channel movement stays visible without assembling separate systems.',
  },
  {
    title: 'Delivery orchestration',
    description: 'Last-mile coordination, service levels, and customer outcomes sit inside the same accountable model.',
  },
] as const;

export const secondNatureWhyBuy = [
  'One accountable operating partner',
  'Faster launch without ecosystem assembly',
  'Visibility across the supply chain',
  'Lower operational complexity for founders',
  'A system designed for growing consumer brands',
] as const;
