export interface Car {
	id: string; // Identifier of the car
	url: string; // The URL of the car listing
	name: string; // The name of the car
	details: string; // Details about the car
	price: string; // Price of the car
	year: string; // Year of manufacture
	mileage: string; // Mileage of the car
	fuel_type: string; // Type of fuel used
	transmission: string; // Type of transmission
	drive_type: string; // Type of drive (e.g., all-wheel drive)
	image_url: string; // URL of the car's image
}

export interface CarResponse {
	data: Car[];
	nextPage: number;
}
