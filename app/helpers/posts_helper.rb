module PostsHelper
    def linked_users(content)
       content.gsub /@([\w]+)/ do |match|
        switched = match.gsub(/@/,"")   
        link_to match, gimme_profile_path(switched), class: "mention", data: {no_turbolink: 'true'}
       end.html_safe
    end
end
