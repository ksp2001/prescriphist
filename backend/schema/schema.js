const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');

const Doctors = require('../models/Doctor');
const Appointments = require('../models/Appointment');
const Fills = require('../models/Fill');


// TYPES 
const DoctorType = new GraphQLObjectType({
    name: 'Doctor',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        speciality: {type: GraphQLString},
        notes: {type: GraphQLString},
        colour: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});

const AppointmentType = new GraphQLObjectType({
    name: 'Appointment',
    fields: () => ({
        id: {type: GraphQLID},
        // we just have to give id
        doctor: {
            type: DoctorType,
            resolve(parent, args) {
                return Doctors.findById(parent.doctorId);
            }
        },
        date: {type: GraphQLString},
        prescription: {type: GraphQLString},
        cost: {type: GraphQLFloat},
        notes: {type: GraphQLString},
    })
})

const FillType = new GraphQLObjectType({
    name: 'Fill',
    fields: () => ({
        id: {type: GraphQLID},
        // we just have to give id
        appointment: {
            type: AppointmentType,
            resolve(parent, args) {
                return Appointments.findById(parent.appointmentId);
            }
        },
        cost: {type: GraphQLFloat},
        dispensary: {type: GraphQLString},
        notes: {type: GraphQLString},
        date: {type: GraphQLString}
    })
})


// ROOT QUERY (get)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        doctor: {
            type: DoctorType,
            args: {id: {type: GraphQLID}},
            resolve(args) {
                return Doctors.findById(args.id);
            }
        },
        doctors: {
            type: new GraphQLList(DoctorType),
            resolve() { 
                return Doctors.find();
            }
        },
        appointment: {
            type: AppointmentType,
            args: {id: {type: GraphQLID}},
            resolve(args) {
                return Appointments.findById(args.id);
            }
        },
        appointments: {
            type: new GraphQLList(AppointmentType),
            resolve() { 
                return Appointments.find();
            }
        },
        fill: {
            type: FillType,
            args: {id: {type: GraphQLID}},
            resolve(args) {
                return Fills.findById(args.id);
            }
        },
        fills: {
            type: new GraphQLList(FillType),
            resolve() { 
                return Fills.find();
            }
        },
    }
});

// MUTATIONS (post, put, delete)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDoctor: {
            type: DoctorType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                address: {type: GraphQLString},
                speciality: {type: GraphQLString},
                notes: {type: GraphQLString},
                colour: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLString},
            },
            resolve(parent, args) {
                let doctor = new Doctors({
                    name: args.name,
                    address: args.address,
                    speciality: args.speciality,
                    notes: args.notes,
                    colour: args.colour,
                    phone: args.phone,
                });
                return doctor.save();
            },
        },
        deleteDoctor: {
            type: DoctorType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Doctors.findByIdAndDelete(args.id);
            }
        },
        editDoctor: {
            type: DoctorType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                address: {type: GraphQLString},
                speciality: {type: GraphQLString},
                notes: {type: GraphQLString},
                colour: {type: GraphQLString},
                phone: {type: GraphQLString},
            },
            resolve(parent, args) {
                return Doctors.findByIdAndUpdate(args.id, args);
            }
        },
        addAppointment: {
            type: AppointmentType,
            args: {
                doctorId: {type: GraphQLNonNull(GraphQLID)},
                date: {type: GraphQLNonNull(GraphQLString)},
                prescription: {type: GraphQLString},
                cost: {type: GraphQLFloat},
                notes: {type: GraphQLString},
            },
            resolve(parent, args) {
                let appointment = new Appointments({
                    doctorId: args.doctorId,
                    date: args.date,
                    prescription: args.prescription,
                    cost: args.cost,
                    notes: args.notes,
                });
                return appointment.save();
            }
        },
        deleteAppointment: {   
            type: AppointmentType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Appointments.findByIdAndDelete(args.id);
            }
        },
        editAppointment: {
            type: AppointmentType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                doctorId: {type: GraphQLID},
                date: {type: GraphQLString},
                prescription: {type: GraphQLString},
                cost: {type: GraphQLFloat},
                notes: {type: GraphQLString},
            },
            resolve(parent, args) {
                return Appointments.findByIdAndUpdate(args.id, args);
            }
        },
        addFill: {
            type: FillType,
            args: {
                appointmentId: {type: GraphQLNonNull(GraphQLID)},
                cost: {type: GraphQLFloat},
                dispensary: {type: GraphQLString},
                notes: {type: GraphQLString},
                date: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                let fill = new Fills({
                    appointmentId: args.appointmentId,
                    cost: args.cost,
                    dispensary: args.dispensary,
                    notes: args.notes,
                    date: args.date,
                });
                return fill.save();
            }
        },
        deleteFill: {
            type: FillType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Fills.findByIdAndDelete(args.id);
            }
        },
        editFill: {
            type: FillType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                appointmentId: {type: GraphQLID},
                cost: {type: GraphQLFloat},
                dispensary: {type: GraphQLString},
                notes: {type: GraphQLString},
                date: {type: GraphQLString},
            },
            resolve(parent, args) {
                return Fills.findByIdAndUpdate(args.id, args);
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});