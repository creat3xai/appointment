interface AppointmentT{
    selectedTimeSlot: string | null;
    selectedService: string | null;
    date: string | undefined;
    details: {
        name: string;
        email: string;
        phone: string;
        description: string;
    };
}