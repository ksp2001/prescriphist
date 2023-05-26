const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLFloat, GraphQLList } = require('graphql');

const Doctors = require('../models/Doctor');
const Appointments = require('../models/Appointment');
const Fills = require('../models/Fill');

const DoctorType = new GraphQLObjectType({
    name: 'Doctor',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        speciality: {type: GraphQLString},
        notes: {type: GraphQLString},
        colour: {type: GraphQLString},
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

module.exports = new GraphQLSchema({
    query: RootQuery
});