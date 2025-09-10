import Medicine from "../models/Medicine.js"

export const getAllMedicines = async (req, res) => {
    try {
         const medicines = await Medicine.find().sort({ createdAt: -1 });
        res.status(200).json(medicines);
    } catch (error) {
        console.log("Error in getAllMedicines Controller");
        res.status(500).json({message: "Internal Server error"})
    }
}

export const addMedicines = async(req, res) =>{
    const {name, brand, composition, usage,price, stock, isPrescriptionRequired} = req.body;

    try {
        if (!name || !price || !stock) {
          return res.status(400).json({ message: "Name, price and stock are required" });
        }

        const medicine = await Medicine.create({
            name,
            brand,
            composition,
            usage,
            price,
            stock,
            isPrescriptionRequired,
        });

        res.status(201).json(medicine);

    } catch (error) {
        console.error("Error adding medicine:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMedicineById = async(req, res) =>{
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine){
           return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json(medicine);
    } catch (error) {
        console.error("Error in getMedicineById :", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateMedicine = async (req, res) =>{
    try {
        const {id} = req.params;

        const medicine = await Medicine.findByIdAndUpdate(id, 
            {$set: req.body},
            {new: true, runValidators: true}
        )

        if(!medicine){
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json(medicine);
    } catch (error) {
        console.error("Error updating medicine:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteMedicine = async(req, res) =>{
    try {
        const {id} = req.params;

        const medicine = await Medicine.findByIdAndDelete(id);
        if (!medicine){
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json({message: "Medicine deleted successfully"});
    } catch (error) {
        console.error("Error deleting medicine:", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}