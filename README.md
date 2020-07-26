# Internet-Applications

Ονοματεπώνυμο: Μουρογιάννης Κωνσταντίνος_
Αριθμός μητρώου: 03116056

Στο πλαίσιο του μαθήματος "Διαδίκτυο και Εφαρμογές" της σχολής ΗΜΜΥ θα υλοποιηθεί ένα restful API για τη λήψη δεδομένων εισόδου και την εξαγωγή χρήσιμης πληροφορίας για το χρήστη μέσω των προτεινόμενων διαδικτυακών υπηρεσιών (Web Services). Η συγκεκριμένη εφαρμογή στοχεύει στην παροχή των εξής λειτουργικών υπηρεσιών:

1] Ο χρήστης εισάγει συντεταγμένες τοποθεσίας.  Μέσω των προτεινόμενων web services της itravel προσδιορίζονται οι m κοντινότερες στάσεις προς αυτή την τοποθεσία και επιστρέφονται τo id, το όνομα και οι συντεταγμένες κάθε στάσης. Το m θα έχει συγκεκριμένο πεδίο ορισμού και θα ορίζεται είτε δυναμικά μέσω κατάλληλης επιλογής από το χρήστη είτε στατικά από το διαχειριστή της εφαρμογής (αυτό θα καθορισθεί κατά τη διαδικασία της υλοποίησης).

2] Ο χρήστης εισάγει τις συντεταγμένες της τοποθεσίας του και τις συντεταγμένες του προορισμού του. Μέσω των προτεινόμενων web services προσδιορίζονται ο κοντινότερος σταθμός στην τοποθεσία του και ο κοντινότερος σταθμός στον προορισμό. Επιστρέφονται όλες οι διαδρομές (εφόσον υπάρχουν) που περιλαμβάνουν τους δύο αυτούς σταθμούς ως ενδιάμεσους ή τερματικούς (δηλαδή όλες τις κοινές διαδρομές που περνούν από αυτούς).

3] Από τα δεδομένα του καιρού επιστρέφονται οι συγεκριμένες λεωφορειακές γραμμές όπου στην αφετηρία τους δε βρέχει αυτή τη στιγμή. Παράλληλα, επιστρέφονται οι τερματικοί σταθμοί που μπορώ να φτάσω με αυτές τις γραμμές.

Η εφαρμογή θα περιλαμβάνει στοιχειώδες front-end, μια διεπαφή (cli) για την άμεση επικοινωνία με το χρήστη και έναν απλό εξυπηρετητή των αιτημάτων του χρήστη (api). Σημειώνεται ότι για την ομαλή ολοκλήρωση του project ενδέχεται να χρησιμοποιηθούν δεδομένα αποθηκευμένα σε αρχεία και να τροποποιηθούν ελαφρώς οι λειτουργίες, χωρίς να αλλάξει ο βασικός σκελετός πάνω στον οποίο βασίζεται η εφαρμογή. Για την υλοποίηση του cli θα χρησιμοποιηθεί Python.
