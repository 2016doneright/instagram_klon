class Post < ActiveRecord::Base
    mount_uploader :image, PostUploader
    belongs_to :user
    has_many :comments, dependent: :destroy
    
    acts_as_votable
    
    validate :picture_size
    
    validates_presence_of :image
    
    def picture_size
      if image.size > 1.megabytes
        errors.add(:image, "Please keep the image size below 1MB")
      end
    end
    
    def next
        self.class.where("id > ?", id).first
    end
  
    def prev
        self.class.where("id < ?", id).last
    end
    
    
end
