# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Contact.create!(firstName: 'Renan',
                email: 'email@renangarcia.me',
                lastName: 'Garcia',
                phoneNumber: '123456')
Contact.create!(firstName: 'Paloma',
                email: 'email@palomabotelho.me',
                lastName: 'Botelho',
                phoneNumber: '123456')
