# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.destroy_all
Post.destroy_all

25.times do |i|
    User.create do |user|
        user.email = Faker::Internet.email
        user.password = "agasdgasdgasd"
        user.avatar = open("db/uifaces/#{i}.jpg")
        user.description = Faker::Hipster.paragraph
        user.real_name = Faker::Name.first_name + " " + Faker::Name.last_name
        user.profile_name = (user.real_name).gsub(/\s/,"").downcase
        puts "#{user.real_name} created"
    end
end

1.times do |i|
    for current in 1..893
       Post.create do |post|
          post.title = Faker::Hacker.say_something_smart.truncate(60)
          post.image = open("db/kej/#{current}.jpg")
          post.user_id = User.all.sample.id
       end
    end
end

hashtags = %w(fashion friends smile like4like instamood family amazing nofilter style follow4follow sun tflers beach lol hair  iphoneonly cool girls webstagram funny iphonesia tweegram black instacool makeup igdaily instagramhub awesome instafollow  bored nice eyes all_shots throwback look)

4000.times do |i|
    Comment.create do |comment|
        comment.content = "@" + User.all.sample.profile_name + " " + Faker::Hacker.say_something_smart + " #" + hashtags .sample + "."
        comment.user_id = User.all.sample.id
        comment.post_id = Post.all.sample.id
        
    end
end

puts "====================="
puts "about to do following"

1500.times do(User.all.sample.follow(User.all.sample))end

puts "====================="
puts "about to do liking"

80000.times do (User.all.sample.likes(Post.find(Post.ids.sample)))end
