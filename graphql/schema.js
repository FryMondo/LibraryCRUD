const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const Book = require('../models/Book');
const Firm = require('../models/Firm');

// ===== Тип Firm
const FirmType = new GraphQLObjectType({
    name: 'Firm',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        address: {type: GraphQLString}
    })
});

// ===== Тип Book
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        author: {type: GraphQLString},
        author_address: {type: GraphQLString},
        year_published: {type: GraphQLInt},
        publisher_address: {type: GraphQLString},
        price: {type: GraphQLFloat},
        firm_id: {
            type: FirmType,
            resolve(parent, args) {
                return Firm.findById(parent.firm_id);
            }
        }
    })
});

// ===== Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllBooks: {
            type: new GraphQLList(BookType),
            resolve() {
                return Book.find();
            }
        },
        getBook: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(_, args) {
                return Book.findById(args.id);
            }
        },
        getAllFirms: {
            type: new GraphQLList(FirmType),
            resolve() {
                return Firm.find();
            }
        }
    }
});

// ===== Mutations (CRUD)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                author: {type: GraphQLString},
                author_address: {type: GraphQLString},
                year_published: {type: GraphQLInt},
                publisher_address: {type: GraphQLString},
                price: {type: GraphQLFloat},
                firm_id: {type: GraphQLID}
            },
            resolve(_, args) {
                const book = new Book(args);
                return book.save();
            }
        },
        updateBook: {
            type: BookType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: GraphQLString},
                author: {type: GraphQLString},
                price: {type: GraphQLFloat}
            },
            resolve(_, args) {
                return Book.findByIdAndUpdate(args.id, args, {new: true});
            }
        },
        deleteBook: {
            type: BookType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(_, args) {
                return Book.findByIdAndDelete(args.id);
            }
        }
    }
});

// ===== Експорт повної схеми
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
