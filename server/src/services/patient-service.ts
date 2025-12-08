import { Patient } from "@/models/patient.model"
import { AppError } from "@/utils/error-handler"




export class PatientService{
    
    
    async getProfile(userId:string){
        const patient = await Patient.findOne({userId}).populate('userId');
        if(!patient){
            throw new AppError("Patient profile not found ",404)
        }
        return patient;
    }

    async updateProfile(userId :string,data:any){
        const patient  = await Patient.findOneAndUpdate(
            {userId},
            {$set:data},
            {new:true,runValidators:true}
        );
        if(!patient){
            throw new AppError("Patient profile not found",404)
        }

        return patient;
    }

//     async getMedicalHistory(userId: string) {
//     const patient = await Patient.findOne({ userId });
    
//     if (!patient) {
//       throw new AppError('Patient not found', 404);
//     }

//     const history = await MedicalHistory.find({ patientId: patient._id })
//       .populate('doctorId', 'firstName lastName specialization')
//       .sort({ date: -1 });

//     return history;
//   }
}