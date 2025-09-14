export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "reserved":
        return "bg-green-100 text-green-700";
        case "pending":
        return "bg-orange-100 text-orange-700";
        case "completed":
        return "bg-emerald-100 text-emerald-700";
        case "cancelled":
        return "bg-red-100 text-red-700";
        case "returning":
        return "bg-yellow-100 text-yellow-700";
        default:
        return "bg-gray-100 text-gray-700";
  }
};