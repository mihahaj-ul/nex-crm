export const stats = [
  { label: "Total Contacts", value: "248", change: "+12% this month" },
  { label: "Active Deals", value: "42", change: "+8% this month" },
  { label: "Revenue Won", value: "$94,200", change: "+23% this month" },
  { label: "Tasks Due", value: "17", change: "5 overdue" },
];

export const chartData = [
  { month: "Jan", deals: 12 },
  { month: "Feb", deals: 18 },
  { month: "Mar", deals: 15 },
  { month: "Apr", deals: 25 },
  { month: "May", deals: 22 },
  { month: "Jun", deals: 30 },
  { month: "Jul", deals: 28 },
  { month: "Aug", deals: 35 },
  { month: "Sep", deals: 40 },
  { month: "Oct", deals: 38 },
  { month: "Nov", deals: 45 },
  { month: "Dec", deals: 50 },
];

export const recentActivity = [
  {
    id: 1,
    action: "New contact added",
    name: "Sarah Johnson",
    time: "2 mins ago",
  },
  {
    id: 2,
    action: "Deal won",
    name: "Tech Corp — $12,000",
    time: "1 hour ago",
  },
  { id: 3, action: "Note added", name: "James Wilson", time: "3 hours ago" },
  {
    id: 4,
    action: "Deal lost",
    name: "StartupXYZ — $5,000",
    time: "5 hours ago",
  },
  { id: 5, action: "Contact updated", name: "Maria Garcia", time: "1 day ago" },
];

export const recentContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    company: "Apple Inc",
    status: "Active",
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james@example.com",
    company: "Google LLC",
    status: "Lead",
  },
  {
    id: 3,
    name: "Maria Garcia",
    email: "maria@example.com",
    company: "Microsoft",
    status: "Active",
  },
  {
    id: 4,
    name: "John Smith",
    email: "john@example.com",
    company: "Amazon",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    company: "Meta",
    status: "Lead",
  },
];

export const contacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 234 567 890",
    company: "Apple Inc",
    status: "Active",
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james@example.com",
    phone: "+1 234 567 891",
    company: "Google LLC",
    status: "Lead",
  },
  {
    id: 3,
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "+1 234 567 892",
    company: "Microsoft",
    status: "Active",
  },
  {
    id: 4,
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 234 567 893",
    company: "Amazon",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 234 567 894",
    company: "Meta",
    status: "Lead",
  },
  {
    id: 6,
    name: "Robert Brown",
    email: "robert@example.com",
    phone: "+1 234 567 895",
    company: "Netflix",
    status: "Active",
  },
  {
    id: 7,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+1 234 567 896",
    company: "Tesla",
    status: "Lead",
  },
  {
    id: 8,
    name: "David Martinez",
    email: "david@example.com",
    phone: "+1 234 567 897",
    company: "Spotify",
    status: "Inactive",
  },
  {
    id: 9,
    name: "Jennifer Taylor",
    email: "jennifer@example.com",
    phone: "+1 234 567 898",
    company: "Airbnb",
    status: "Active",
  },
  {
    id: 10,
    name: "Michael Lee",
    email: "michael@example.com",
    phone: "+1 234 567 899",
    company: "Uber",
    status: "Lead",
  },
];

export type Deal = {
  id: number;
  name: string;
  contact: string;
  value: string;
  stage: string;
};

export const deals: Deal[] = [
  {
    id: 1,
    name: "Website Redesign",
    contact: "Sarah Johnson",
    value: "$12,000",
    stage: "Lead",
  },
  {
    id: 2,
    name: "Mobile App Dev",
    contact: "James Wilson",
    value: "$25,000",
    stage: "Lead",
  },
  {
    id: 3,
    name: "SEO Campaign",
    contact: "Maria Garcia",
    value: "$5,000",
    stage: "Contacted",
  },
  {
    id: 4,
    name: "CRM Integration",
    contact: "John Smith",
    value: "$8,000",
    stage: "Contacted",
  },
  {
    id: 5,
    name: "Cloud Migration",
    contact: "Emily Davis",
    value: "$18,000",
    stage: "Interested",
  },
  {
    id: 6,
    name: "UI/UX Audit",
    contact: "Robert Brown",
    value: "$6,500",
    stage: "Proposal",
  },
  {
    id: 7,
    name: "Data Analytics",
    contact: "Lisa Anderson",
    value: "$14,000",
    stage: "Proposal",
  },
  {
    id: 8,
    name: "E-commerce Setup",
    contact: "David Martinez",
    value: "$9,000",
    stage: "Won",
  },
];

export const stages = ["Lead", "Contacted", "Interested", "Proposal", "Won"];
