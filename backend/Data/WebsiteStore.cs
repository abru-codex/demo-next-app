using DemoCrud.Models;

namespace DemoCrud.Data
{
    public static class WebsiteStore
    {
        public static List<Website> Websites = new List<Website>
        {
            new Website { Id = 1, Name = "Google", Domain = "google.com", Description = "Search engine" },
            new Website { Id = 2, Name = "Facebook", Domain = "facebook.com", Description = "Social media" },
            new Website { Id = 3, Name = "Twitter", Domain = "twitter.com", Description = "Social media" },
            new Website { Id = 4, Name = "LinkedIn", Domain = "linkedin.com", Description = "Social media" },
            new Website { Id = 5, Name = "Microsoft", Domain = "microsoft.com", Description = "Technology company" }
        };

        public static Website? GetWebsite(int id)
        {
            return Websites.FirstOrDefault(w => w.Id == id);
        }

        public static void AddWebsite(Website website)
        {
            website.Id = Websites.Max(w => w.Id) + 1;
            Websites.Add(website);
        }

        public static void UpdateWebsite(Website website)
        {
            var existingWebsite = Websites.FirstOrDefault(w => w.Id == website.Id);
            if (existingWebsite != null)
            {
                existingWebsite.Name = website.Name;
                existingWebsite.Domain = website.Domain;
                existingWebsite.Description = website.Description;
            }
        }

        public static void DeleteWebsite(int id)
        {
            var website = Websites.FirstOrDefault(w => w.Id == id);
            if (website != null)
            {
                Websites.Remove(website);
            }
        }

        public static List<Website> GetWebsites()
        {
            return Websites;
        }
    }
}
